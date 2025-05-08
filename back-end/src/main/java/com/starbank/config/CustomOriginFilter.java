package com.starbank.config;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@Component
public class CustomOriginFilter extends OncePerRequestFilter {

    private final String allowedOrigin = System.getenv().getOrDefault("FRONTEND_URL", "http://localhost:3000");

    @Override
    protected void doFilterInternal(HttpServletRequest request, javax.servlet.http.HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String origin = request.getHeader("Origin");
        String referer = request.getHeader("Referer");

        if (origin != null && origin.equals(allowedOrigin) || (referer != null && referer.contains(allowedOrigin))) {
            filterChain.doFilter(request, response);
        } else {
            response.setStatus(403);
            response.getWriter().write("Access Denied");
            return;
        }
    }
}
