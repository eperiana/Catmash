package fr.catmash.mapper;

import fr.catmash.dto.CatDto;
import fr.catmash.model.Cat;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;


class CatMapperTest {
    private final CatMapper catMapper = new CatMapper();

    @Test
    void testUpdateEntityFromDto(){
        final Cat catToUpdate = new Cat(1L, null, 1L);
        final CatDto dto = new CatDto(1L, "/url-sympa.fr", 1L);

        catMapper.updateEntityFromDto(catToUpdate, dto);

        assertEquals(1L, catToUpdate.getVoteCounter());
        assertEquals("/url-sympa.fr", catToUpdate.getUrl());

    }

    @Test
    void testToDto(){
        final Cat cat = new Cat(1L, "url-sympa.fr", 1L);
        final CatDto dto = catMapper.toDto(cat);

        assertEquals(1L, dto.id());
        assertEquals("url-sympa.fr", dto.url());
        assertEquals(1L, dto.voteCounter());
    }

    @Test
    void testDoDtos(){
        final Cat cat = new Cat(1L, "url-sympa.fr", 1L);
        final List<Cat> cats = List.of(cat);

        final List<CatDto> dtos = catMapper.toDtos(cats);

        assertEquals(1, dtos.size());
        assertEquals(1L, dtos.getFirst().id());
        assertEquals("url-sympa.fr", dtos.getFirst().url());
        assertEquals(1L, dtos.getFirst().voteCounter());
    }



}