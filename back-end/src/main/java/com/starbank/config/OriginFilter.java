package com.starbank.config;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class OriginFilter extends OncePerRequestFilter {

    private final String allowedOrigin = System.getenv().getOrDefault("FRONTEND_URL", "http://localhost:3000");

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String origin = request.getHeader("Origin");

        if (!"OPTIONS".equalsIgnoreCase(request.getMethod())) {
            if (origin == null || !origin.equals(allowedOrigin)) {
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("Access denied by origin policy");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}
