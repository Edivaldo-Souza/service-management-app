package com.edv.servicemanagement.commons;

public class ResponseUtil {
    public static <T> ApiResponse<T> success(T data, String message, String path){

        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSuccess(true);

        apiResponse.setMessage(message);

        apiResponse.setData(data);

        apiResponse.setError(null);

        apiResponse.setTimestamp(System.currentTimeMillis());

        apiResponse.setPath(path);

        return apiResponse;
    }

    public static <T> ApiResponse<T> error(String error, String path){

        ApiResponse<T> apiResponse = new ApiResponse<>();

        apiResponse.setSuccess(false);

        apiResponse.setMessage(null);

        apiResponse.setData(null);

        apiResponse.setError(error);

        apiResponse.setTimestamp(System.currentTimeMillis());

        apiResponse.setPath(path);

        return apiResponse;
    }
}
