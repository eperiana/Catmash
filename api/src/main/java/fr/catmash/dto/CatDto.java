package fr.catmash.dto;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CatDto(
        Long id,
        @NotNull String url,
        @Min(0) Long voteCounter)
{}
