package com.fridge.graphql.util;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.Objects;

import static com.fridge.graphql.util.DateTimeHelper.DATE_FORMATTERS;

public class LocalDateTimeConverter {

    private final boolean zoneConversionEnabled;

    public LocalDateTimeConverter(boolean zoneConversionEnabled) {
        this.zoneConversionEnabled = zoneConversionEnabled;
    }

    public String formatDate(LocalDate date, DateTimeFormatter formatter) {
        Objects.requireNonNull(date, "date");
        Objects.requireNonNull(formatter, "formatter");

        return formatter.format(date);
    }

    public String formatDate(LocalDateTime dateTime, DateTimeFormatter formatter) {
        Objects.requireNonNull(dateTime, "dateTime");
        Objects.requireNonNull(formatter, "formatter");

        return formatter.format(toUTC(dateTime));
    }

    public LocalDateTime parseDate(String date) {
        Objects.requireNonNull(date, "date");
        for (DateTimeFormatter formatter : DATE_FORMATTERS) {
            // try to parse as dateTime
            try {
                LocalDateTime dateTime = LocalDateTime.parse(date, formatter);
                return fromUTC(dateTime);
            } catch (java.time.format.DateTimeParseException ignored) {
            }

            // try to parse as date
            try {
                // equals ISO_LOCAL_DATE or custom date format
                LocalDate localDate = LocalDate.parse(date, formatter);
                return localDate.atStartOfDay();
            } catch (java.time.format.DateTimeParseException ignored) {
            }
        }

        return null;
    }

    public LocalDateTime convert(LocalDateTime dateTime, ZoneId from, ZoneId to) {
        if (zoneConversionEnabled) {
            return dateTime.atZone(from).withZoneSameInstant(to).toLocalDateTime();
        }
        return dateTime;
    }

    public LocalDateTime fromUTC(LocalDateTime dateTime) {
        return convert(dateTime, ZoneOffset.UTC, ZoneId.systemDefault());
    }

    public ZonedDateTime toUTC(LocalDateTime dateTime) {
        return ZonedDateTime.of(convert(dateTime, ZoneId.systemDefault(), ZoneOffset.UTC), ZoneOffset.UTC);
    }

}
