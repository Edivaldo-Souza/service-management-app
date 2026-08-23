package com.edv.servicemanagement.components.demand.domain.services.impl;

import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.components.demand.domain.entities.Demand;
import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import com.edv.servicemanagement.components.user.domain.entities.User;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StreamUtils;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.DateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Base64;

@Service
public class InvoiceServiceImpl {

    private final TemplateEngine templateEngine;

    private final DemandGroupServiceImpl demandGroupService;

    private final Path fileStorageLocation;

    public InvoiceServiceImpl(@Value("${file.upload-dir}") String fileStorageLocation,
                              TemplateEngine templateEngine, DemandGroupServiceImpl demandGroupService){
        this.templateEngine = templateEngine;
        this.demandGroupService = demandGroupService;
        this.fileStorageLocation = Paths.get(fileStorageLocation).toAbsolutePath().normalize();
    }

    public byte[] createInvoice(User user, Long id){

        DemandGroup demandGroup = demandGroupService.getById(id);
        if(demandGroup==null){
            throw new ResourceNotFoundException("Unable to find demandGroup with id: "+id);
        }

        String imgPath = fileStorageLocation.resolve(user.getFile().getName()).toAbsolutePath().normalize().toString();

        FileSystemResource resource = new FileSystemResource(imgPath);
        byte[] imgBytes;

        try (InputStream inputStream = resource.getInputStream()){
            imgBytes = StreamUtils.copyToByteArray(inputStream);
        }
        catch (IOException exception){
            throw new RuntimeException("Unable to read invoice image file");
        }
        String base64Image = Base64.getEncoder().encodeToString(imgBytes);

        String logoDataUri = "data:image/jpg;base64,"+base64Image;

        Context context = new Context();

        context.setVariable("headerBase64",logoDataUri);

        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");

        context.setVariable("date",demandGroup.getCreated().format(dateTimeFormatter));

        context.setVariable("customer",demandGroup.getCustomer().getName());

        demandGroup.getDemands().forEach(demand -> {
            double unitValue = demand.getValue().doubleValue() / demand.getAmount();
            demand.setUnitValue(new BigDecimal(unitValue));
            demand.setUnitValue(demand.getUnitValue().setScale(2,RoundingMode.HALF_UP));
        });

        demandGroup.getDemands().forEach(demand -> {
            DateTimeFormatter dtf = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm");
            demand.setCreatedString(demand.getCreated().format(dtf));
        });

        context.setVariable("demands",demandGroup.getDemands());

        BigDecimal totalValue = demandGroup.getDemands().stream().map(Demand::getValue)
                .reduce(BigDecimal.ZERO,BigDecimal::add);

        context.setVariable("demandTotalValue",totalValue.doubleValue());

        String htmlProcessed = templateEngine.process("invoice",context);

        try(ByteArrayOutputStream outputStream = new ByteArrayOutputStream()){
            PdfRendererBuilder builder = new PdfRendererBuilder();
            builder.useFastMode();

            builder.withHtmlContent(htmlProcessed,"/");
            builder.toStream(outputStream);
            builder.run();

            return outputStream.toByteArray();
        } catch (IOException e) {
            throw new RuntimeException("Unable to render pdf file");
        }
    }
}
