package fr.catmash.business;

import fr.catmash.dao.CatDao;
import fr.catmash.exception.CatNotFoundException;
import fr.catmash.mapper.CatMapper;
import fr.catmash.model.Cat;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Sort;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CatServiceTest {

    @InjectMocks
    private CatService catService;

    @Mock
    private CatMapper catMapper;

    @Mock
    private CatDao catDao;

    @Test
    void getCatsOrderByVotes() {
        catService.getCatsOrderByVotes();
        verify(catDao).findAll(Sort.by(Sort.Direction.DESC, "voteCounter"));
        verify(catMapper).toDtos(anyList());
    }

    @Test
    void testCatVoteCatNotExist() {
        when(catDao.findById(anyLong())).thenReturn(Optional.empty());
        assertThrows(CatNotFoundException.class, () -> catService.catVote(1L));
    }

    @Test
    void testCatVoteCatExist() {
        when(catDao.findById(anyLong())).thenReturn(Optional.of(new Cat(1L, "test", 2L)));
        assertDoesNotThrow(() -> catService.catVote(1L));
        verify(catDao).save(new Cat(1L, "test", 3L));
    }
}