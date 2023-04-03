package com.fridge.graphql.configuration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.support.OpenEntityManagerInViewFilter;

import javax.servlet.Filter;

@Configuration
public class OpenFilterConfiguration {

    // Servlet Filter that binds a JPA EntityManager to the thread for the entire processing of the request.
    // Intended for the "Open EntityManager in View" pattern,
    // i.e. to allow for lazy loading in web views despite the original transactions already being completed.
    @Bean
    public Filter OpenFilter() {
        return new OpenEntityManagerInViewFilter();
    }
}
