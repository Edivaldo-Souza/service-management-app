package com.edv.servicemanagement.components.user.domain.repositories;

import com.edv.servicemanagement.components.user.domain.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    boolean existsByEmail(String email);

    @Query(value = "SELECT u FROM User u WHERE u.email=:email")
    Optional<User> getByEmail(@Param("email") String email);

    UserDetails findByEmail(String email);
}
