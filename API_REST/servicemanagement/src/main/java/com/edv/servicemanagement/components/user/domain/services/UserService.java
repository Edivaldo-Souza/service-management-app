package com.edv.servicemanagement.components.user.domain.services;

import com.edv.servicemanagement.components.user.domain.entities.User;

public interface UserService {
     User getById(Long id);
     User getByToken(String token);
     User getByEmail(String email);
     User create(User user);
     User update(User user);
     boolean delete (Long id);
}
