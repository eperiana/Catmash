package fr.catmash.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Filtre pour gérer l'authentification via Origin
 */
@Component
public class FrontOriginAuthFilter extends OncePerRequestFilter {
    @Value("${allowed.origin.front}")
    private String allowedFrontOrigin;



    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String origin = request.getHeader("Origin");
        String referer = request.getHeader("Referer");

        boolean isApiRequest = request.getRequestURI().startsWith("/api/");
        boolean isAllowed =
                (origin != null && origin.startsWith(allowedFrontOrigin)) ||
                        (referer != null && referer.startsWith(allowedFrontOrigin));

        if (isApiRequest && !isAllowed) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized origin");
            return;
        }

        filterChain.doFilter(request, response);
    }
}
