package com.lovestory.api.security.jwt;

import org.springframework.security.core.Authentication;

/**
 * Service interface for JWT token operations.
 * This interface follows the Single Responsibility Principle by focusing only on JWT operations.
 * It also enables Dependency Inversion by allowing different implementations.
 */
public interface JwtService {
    
    /**
     * Generates a JWT token for the given authentication.
     *
     * @param authentication the authentication object containing user details
     * @return the generated JWT token
     */
    String generateJwtToken(Authentication authentication);
    
    /**
     * Extracts the username from a JWT token.
     *
     * @param token the JWT token
     * @return the username extracted from the token
     */
    String getUserNameFromJwtToken(String token);
    
    /**
     * Validates a JWT token.
     *
     * @param token the JWT token to validate
     * @return true if the token is valid, false otherwise
     */
    boolean validateJwtToken(String token);
}