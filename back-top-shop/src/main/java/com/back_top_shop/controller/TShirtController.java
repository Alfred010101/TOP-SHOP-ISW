package com.back_top_shop.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.back_top_shop.model.TShirt;
import com.back_top_shop.service.TShirtService;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/tshirts")
@RequiredArgsConstructor
public class TShirtController {

    private final TShirtService tshirtService;

    @Value("${upload.dir}")
    private String uploadDir;

    @PostMapping("/register")
    public TShirt uploadTShirt(
            @RequestParam String title,
            @RequestParam MultipartFile image,
            @RequestParam String category,
            @RequestParam String type,
            @RequestParam String talla,
            @RequestParam Double price,
            @RequestParam Integer existence,
            @RequestParam String description
    ) throws IOException {
        if (image.isEmpty()) {
            return null;
        }

        // Generar nombre único
        String originalFilename = image.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String nuevoNombre = UUID.randomUUID() + extension;

        // Guardar archivo en disco
        File destino = new File(uploadDir + nuevoNombre);
        image.transferTo(destino);
        // Guardar imagen con nombre único
       /* String extension = image.getOriginalFilename().substring(image.getOriginalFilename().lastIndexOf('.'));
        String uniqueName = UUID.randomUUID() + extension;
        File targetFile = new File(uploadDir, uniqueName);
        image.transferTo(targetFile);*/

        // Crear camiseta
        TShirt tshirt = new TShirt();
        tshirt.setTitle(title);
        tshirt.setResource(nuevoNombre);
        tshirt.setCategory(TShirt.Category.valueOf(category)); 
        tshirt.setType(TShirt.Type.valueOf(type));
        tshirt.setTalla(TShirt.Talla.valueOf(talla));
        tshirt.setPrice(price);
        tshirt.setExistence(existence);
        tshirt.setDescription(description);

        return tshirtService.save(tshirt);
    }

    @GetMapping("/list")
    public List<TShirt> listarImagenesAll() 
    {
        return tshirtService.findAll();
    }

    @GetMapping("/last")
    public List<TShirt> listarImagenesLast() 
    {
        return tshirtService.findLast();
    }

    @GetMapping("/saludar")
    public String welcome()
    {
        return "Welcome Spring Security... as admin";
    }
}
