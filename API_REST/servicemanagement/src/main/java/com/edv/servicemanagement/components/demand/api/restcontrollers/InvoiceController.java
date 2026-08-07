package com.edv.servicemanagement.components.demand.api.restcontrollers;

import com.edv.servicemanagement.components.demand.domain.services.impl.InvoiceServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("v1/invoice")
@RequiredArgsConstructor
public class InvoiceController {
    private final InvoiceServiceImpl invoiceService;

    @GetMapping
    private ResponseEntity<byte[]> downloadInvoice (@RequestParam Long id){
        byte[] pdfBytes = invoiceService.createInvoice(id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment","nota_servico.pdf");

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }
}
