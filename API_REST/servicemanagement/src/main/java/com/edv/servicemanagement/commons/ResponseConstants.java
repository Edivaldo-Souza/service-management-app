package com.edv.servicemanagement.commons;

public enum ResponseConstants {
    TOKEN_MAX_AGE(28800);

    private int value;

    ResponseConstants(int value){
        this.value = value;
    }

}
