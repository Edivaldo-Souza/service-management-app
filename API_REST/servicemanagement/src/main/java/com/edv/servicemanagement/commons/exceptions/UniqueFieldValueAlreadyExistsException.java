package com.edv.servicemanagement.commons.exceptions;

import com.edv.servicemanagement.commons.ValidationField;
import lombok.Getter;

import java.util.List;


@Getter
public class UniqueFieldValueAlreadyExistsException extends RuntimeException{

    private List<ValidationField> validationFields;

    public UniqueFieldValueAlreadyExistsException(String message, List<ValidationField> validationFields){
        super(message);
        this.validationFields = validationFields;
    }
}
