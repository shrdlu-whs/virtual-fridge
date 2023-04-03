package com.fridge.graphql.error;

import graphql.ErrorClassification;
import graphql.GraphQLError;
import graphql.language.SourceLocation;

import java.util.List;

public class NoSuchElementException extends RuntimeException implements GraphQLError {

    public NoSuchElementException(String msg) {
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
