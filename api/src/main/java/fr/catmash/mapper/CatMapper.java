package fr.catmash.mapper;

import fr.catmash.dto.CatDto;
import fr.catmash.model.Cat;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatMapper {

    public CatDto toDto(final Cat cat){
        return new CatDto(cat.getId(), cat.getUrl(), cat.getVoteCounter());
    }

    public List<CatDto> toDtos(final List<Cat> cats){
        return cats.stream().map(this::toDto).toList();
    }

    public void updateEntityFromDto(final Cat cat, final CatDto dto){
        cat.setVoteCounter(dto.voteCounter());
        cat.setUrl(dto.url());
    }
}
