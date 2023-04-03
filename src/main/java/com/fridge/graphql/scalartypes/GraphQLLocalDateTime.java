package com.fridge.graphql.scalartypes;

import com.fridge.graphql.util.DateTimeHelper;
import com.fridge.graphql.util.LocalDateTimeConverter;
import graphql.language.StringValue;
import graphql.schema.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class GraphQLLocalDateTime extends GraphQLScalarType {

    private static final String DEFAULT_NAME = "LocalDateTime";

    public GraphQLLocalDateTime() {
        this(DEFAULT_NAME, false);
    }

    public GraphQLLocalDateTime(boolean zoneConversionEnabled) {
        this(DEFAULT_NAME, zoneConversionEnabled, DateTimeFormatter.ISO_INSTANT);
    }

    public GraphQLLocalDateTime(final String name, boolean zoneConversionEnabled) {
        this(name, zoneConversionEnabled, DateTimeFormatter.ISO_INSTANT);
    }

    public GraphQLLocalDateTime(final String name, boolean zoneConversionEnabled, DateTimeFormatter formatter) {
        super(name != null ? name : DEFAULT_NAME, "Local Date Time type", new Coercing<LocalDateTime, String>() {
            private final LocalDateTimeConverter converter = new LocalDateTimeConverter(zoneConversionEnabled);

            private LocalDateTime convertImpl(Object input) {
                if (input instanceof String) {
                    LocalDateTime localDateTime = converter.parseDate((String) input);

                    return localDateTime;
                } else if (input instanceof LocalDateTime) {
                    return (LocalDateTime) input;
                }
                return null;
            }

            @Override
            public String serialize(Object input) {
                if (input instanceof LocalDateTime) {
                    return converter.formatDate((LocalDateTime) input, formatter);
                } else {
                    LocalDateTime result = convertImpl(input);
                    if (result == null) {
                        throw new CoercingSerializeException("Invalid value '" + input + "' for LocalDateTime");
                    }
                    return converter.formatDate(result, formatter);
                }
            }

            @Override
            public LocalDateTime parseValue(Object input) {
                LocalDateTime result = convertImpl(input);
                if (result == null) {
                    throw new CoercingParseValueException("Invalid value '" + input + "' for LocalDateTime");
                }
                return result;
            }

            @Override
            public LocalDateTime parseLiteral(Object input) {
                String value = ((StringValue) input).getValue();
                LocalDateTime result = convertImpl(value);
                if (result == null) {
                    throw new CoercingParseLiteralException("Invalid value '" + input + "' for LocalDateTime");
                }

                return result;
            }
        });
        if (!DateTimeHelper.DATE_FORMATTERS.contains(formatter)) {
            DateTimeHelper.DATE_FORMATTERS.add(formatter);
        }
    }

}
