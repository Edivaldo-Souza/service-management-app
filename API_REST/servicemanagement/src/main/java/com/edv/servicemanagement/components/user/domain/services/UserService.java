package com.edv.servicemanagement.components.user.domain.services;

import com.edv.servicemanagement.components.files.domain.entities.File;
import com.edv.servicemanagement.components.user.domain.entities.User;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
     User getById(Long id);
     User getByToken(String token);
     User getByEmail(String email);
     User create(User user, MultipartFile file);
     User update(User user, MultipartFile file);
     boolean delete (Long id);
}
