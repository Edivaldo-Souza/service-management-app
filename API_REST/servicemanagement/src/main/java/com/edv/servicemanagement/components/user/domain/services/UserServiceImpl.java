package com.edv.servicemanagement.components.user.domain.services;

import com.edv.servicemanagement.commons.ValidationField;
import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.commons.exceptions.UniqueFieldValueAlreadyExistsException;
import com.edv.servicemanagement.components.user.domain.entities.User;
import com.edv.servicemanagement.components.user.domain.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public User getById(Long id) {

        Optional<User> userOptional = userRepository.findById(id);

        if(userOptional.isEmpty()){

            throw new ResourceNotFoundException("Unable to find user with id = " + id);

        }

        return userOptional.get();

    }

    @Override
    public User create(User user) {

        validateFields(user);

        String passwordEncoded = passwordEncoder.encode(user.getPassword());

        user.setPassword(passwordEncoded);

        return userRepository.save(user);
    }

    @Override
    public User update(User user) {

        validateFields(user);

        User currentUser = getById(user.getId());

        if(user.getPassword()==null){
            user.setPassword(currentUser.getPassword());
        }

        return userRepository.save(user);

    }

    @Override
    public boolean delete(Long id) {
        return false;
    }

    private void validateFields (User user){

        Optional<User> userWithSameEmail = userRepository.getByEmail(user.getEmail());

        if((userWithSameEmail.isPresent() && user.getId()!=null && !user.getId().equals(userWithSameEmail.get().getId())) ||
           (userWithSameEmail.isPresent() && user.getId()==null)){

            ValidationField duplicatedField = new ValidationField(
                    "email","Email already used by another account");

            throw new UniqueFieldValueAlreadyExistsException(
                    "Duplicated unique values for user",List.of(duplicatedField));

        }

    }
}
