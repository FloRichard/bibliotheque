package ensicaen.projet.librarymanager.repository;

import ensicaen.projet.librarymanager.entity.BookEntity;
import ensicaen.projet.librarymanager.entity.PublisherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Collection;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {
    @Query(value="SELECT t FROM book t WHERE lower(t.title) like lower(concat('%', :title, '%'))")
    Collection<BookEntity> findByTitle (@Param("title") String name);
}
