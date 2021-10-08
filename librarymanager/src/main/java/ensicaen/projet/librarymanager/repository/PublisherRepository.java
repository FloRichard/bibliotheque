package ensicaen.projet.librarymanager.repository;

import ensicaen.projet.librarymanager.entity.BookEntity;
import ensicaen.projet.librarymanager.entity.PublisherEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface PublisherRepository extends JpaRepository<PublisherEntity, Long> {
    @Query(value="SELECT t FROM publisher t WHERE lower(t.name) like lower(concat('%', :name, '%'))")
    Collection<PublisherEntity> findByName (@Param("name") String name);
    @Query(value="SELECT b FROM publisher t JOIN book b ON t.idPublisher = b.publisher.idPublisher where t.idPublisher=:id")
    Collection<BookEntity> getBooksFromPublisher (@Param("id") Long id);
}
