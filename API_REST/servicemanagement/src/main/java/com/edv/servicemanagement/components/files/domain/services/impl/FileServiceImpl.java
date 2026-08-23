package com.edv.servicemanagement.components.files.domain.services.impl;

import com.edv.servicemanagement.components.files.domain.entities.File;
import com.edv.servicemanagement.components.files.domain.repositories.FileRepository;
import com.edv.servicemanagement.components.user.domain.entities.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Optional;
import java.util.UUID;

@Service
public class FileServiceImpl {

    private final FileRepository fileRepository;

    private Path fileStorageLocation;

    public FileServiceImpl(@Value("${file.upload-dir}") String fileStorageLocation, FileRepository fileRepository){
        this.fileStorageLocation = Paths.get(fileStorageLocation).toAbsolutePath().normalize();
        this.fileRepository = fileRepository;
    }

    public File create(User user, MultipartFile file){
        File newFile = new File();

        String uniqueFileName = saveInDirectory(file);

        newFile.setName(uniqueFileName);

        newFile.setUser(user);

        newFile.setType(file.getContentType());

        return fileRepository.save(newFile);
    }

    public void delete(Long id){
        Optional<File> file  = fileRepository.findById(id);
        if(file.isPresent()) {
            String fileName = file.get().getName();
            try {
                Path targetLocation = this.fileStorageLocation.resolve(fileName);
                Files.delete(targetLocation);
            }
            catch (IOException e) {
                e.printStackTrace();
            }
            fileName = null;
            fileRepository.delete(file.get());
        }
    }

    private String saveInDirectory(MultipartFile multipartFile){
        String fileExtension;
        String originalName = multipartFile.getOriginalFilename();

        try{
            fileExtension = originalName.substring(multipartFile.getOriginalFilename().lastIndexOf("."));
        } catch (Exception e){
            fileExtension = "";
        }

        String uniqueName = UUID.randomUUID() + fileExtension;
        try {
            if (originalName.contains("..")) {
                throw new Exception("File name with invalid characters");
            }
            Path targetLocation = this.fileStorageLocation.resolve(uniqueName);
            Files.createDirectories(targetLocation.getParent());
            Files.copy(multipartFile.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
        } catch (Exception e) {
            throw new RuntimeException("Unable to save file in folder", e);
        }
        return uniqueName;
    }
}
