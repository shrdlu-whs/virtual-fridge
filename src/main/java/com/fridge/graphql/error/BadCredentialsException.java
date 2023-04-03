package com.fridge.graphql.error;

import graphql.ErrorClassification;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

import java.util.List;

public class BadCredentialsException extends RuntimeException implements GraphQLError {

    public BadCredentialsException(String msg) {
        super(msg);
    }

    @Override
    public List<SourceLocation> getLocations() {
        return null;
    }

    @Override
    public ErrorClassification getErrorType() {
        return null;
    }
}