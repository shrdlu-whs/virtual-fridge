package com.fridge.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers("/api-docs/**").permitAll()
                .antMatchers("/swagger-ui/**").permitAll()
                .antMatchers("/graphql/**", "/vendor/**", "/subscriptions", "/manifest.json").permitAll()
                .antMatchers("/graphiql/**", "/vendor/**", "/subscriptions").permitAll()
                .antMatchers("/h2-console/**").permitAll()
                .anyRequest()
                .authenticated()
                .and()
                .oauth2ResourceServer()
                .jwt();
        http.headers().frameOptions().disable();
    }
}