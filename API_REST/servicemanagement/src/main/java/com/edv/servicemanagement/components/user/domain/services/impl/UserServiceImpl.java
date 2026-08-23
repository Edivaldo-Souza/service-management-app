package com.edv.servicemanagement.components.user.domain.services.impl;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.edv.servicemanagement.commons.ValidationField;
import com.edv.servicemanagement.commons.exceptions.ResourceNotFoundException;
import com.edv.servicemanagement.commons.exceptions.UniqueFieldValueAlreadyExistsException;
import com.edv.servicemanagement.components.authentication.services.TokenService;
import com.edv.servicemanagement.components.files.domain.services.impl.FileServiceImpl;
import com.edv.servicemanagement.components.user.domain.entities.User;
import com.edv.servicemanagement.components.user.domain.repositories.UserRepository;
import com.edv.servicemanagement.components.user.domain.services.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final TokenService tokenService;
    private final FileServiceImpl fileService;
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
    public User getByToken(String token){

        DecodedJWT decodedJWT = tokenService.decodeToken(token);

        return getByEmail(decodedJWT.getSubject());
    }

    public User getByEmail(String email) {

        Optional<User> userOptional = userRepository.getByEmail(email);

        if(userOptional.isEmpty()){

            throw new ResourceNotFoundException("Unable to find user with email = " + email);

        }

        return userOptional.get();

    }

    @Override
    @Transactional
    public User create(User user, MultipartFile file) {

        validateFields(user);

        String passwordEncoded = passwordEncoder.encode(user.getPassword());

        user.setPassword(passwordEncoded);

        User newUser =  userRepository.save(user);

        fileService.create(newUser,file);

        return newUser;
    }

    @Override
    @Transactional
    public User update(User user, MultipartFile file) {

        validateFields(user);

        User currentUser = getById(user.getId());

        if(user.getPassword()==null || user.getPassword().isBlank()){
            user.setPassword(currentUser.getPassword());
        }
        else{
            String passwordEncoded = passwordEncoder.encode(user.getPassword());

            user.setPassword(passwordEncoded);
        }

        if(file!=null){
            fileService.delete(currentUser.getFile().getId());
            fileService.create(user,file);
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
