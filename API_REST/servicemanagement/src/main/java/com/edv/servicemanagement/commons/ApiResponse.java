package com.edv.servicemanagement.commons;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ApiResponse <T>{
    private boolean success;
    private String message;
    private T data;
    private String error;
    private long timestamp;
    private String path;
}
