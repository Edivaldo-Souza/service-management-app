package com.edv.servicemanagement.components.files.domain.repositories;

import com.edv.servicemanagement.components.files.domain.entities.File;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FileRepository extends JpaRepository<File, Long> {
}
