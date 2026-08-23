package com.edv.servicemanagement.components.demand.api.restcontrollers;

import com.edv.servicemanagement.components.demand.domain.services.impl.InvoiceServiceImpl;
import com.edv.servicemanagement.components.user.domain.entities.User;
import com.edv.servicemanagement.components.user.domain.services.impl.UserServiceImpl;
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
    private final UserServiceImpl userService;

    @GetMapping
    private ResponseEntity<byte[]> downloadInvoice (@RequestParam Long id, @CookieValue("accessToken") String token){

        User currentUser = userService.getByToken(token);

        byte[] pdfBytes = invoiceService.createInvoice(currentUser,id);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment","nota_servico.pdf");

        return ResponseEntity.ok().headers(headers).body(pdfBytes);
    }
}
