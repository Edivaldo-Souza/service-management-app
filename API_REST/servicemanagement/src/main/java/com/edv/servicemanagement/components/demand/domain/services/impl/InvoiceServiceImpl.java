package com.edv.servicemanagement.components.demand.domain.services.impl;

import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.components.demand.domain.entities.DemandGroup;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
@RequiredArgsConstructor
public class InvoiceServiceImpl {

    private final TemplateEngine templateEngine;

    private final DemandGroupServiceImpl demandGroupService;

    public byte[] createInvoice(Long id){

        DemandGroup demandGroup = demandGroupService.getById(id);
        if(demandGroup==null){
            throw new ResourceNotFoundException("Unable to find demandGroup with id: "+id);
        }

        Context context = new Context();
        context.setVariable("title","Nota de serviços");
        context.setVariable("customer",demandGroup.getCustomer().getName());
        context.setVariable("demands",demandGroup.getDemands());

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
