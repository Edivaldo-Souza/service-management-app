package com.edv.servicemanagement.components.user.domain.services;

import com.edv.servicemanagement.components.user.domain.entities.User;

public interface UserService {
    public User get();
    public User create(User user);
    public User update(User user);
    public boolean delete (Long id);
}
