package ru.savelyev.linux.util;


import ru.savelyev.linux.entity.Role;
import ru.savelyev.linux.entity.UserSecrets;
import ru.savelyev.linux.entity.UserDB;
import ru.savelyev.linux.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class JwtUtil {

    private String secret = "ILOVEOPERATIONSYSTEM";

    private final int expiresIn = 36_000_000;

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return !extractExpiration(token).before(new Date());
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, username);
    }

    public UserSecrets getDetailedResponse(String username) {
        return new UserSecrets(generateToken(username), "T", expiresIn);
    }

    private String createToken(Map<String, Object> claims, String subject) {
        UserDB byUserNameDB = userRepository.findUserByUsername(subject);
        List<String> roles = byUserNameDB.getRoles().stream().map(Role::getRole).collect(Collectors.toList());
        Map<String, Object> map = new LinkedHashMap<>();
        map.put("user", byUserNameDB);
        map.put("roles", roles);
        return Jwts.builder().setClaims(claims).addClaims(map).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiresIn))
                .signWith(SignatureAlgorithm.HS256, secret).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && isTokenExpired(token));
    }
}

