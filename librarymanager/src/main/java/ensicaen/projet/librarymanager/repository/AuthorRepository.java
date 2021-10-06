package ensicaen.projet.librarymanager.repository;

import ensicaen.projet.librarymanager.entity.AuthorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Collection;

@Repository
public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {
    @Query(value="SELECT t FROM author t WHERE lower(t.name) like lower(concat('%', :name, '%'))")
    Collection<AuthorEntity> findByName (@Param("name") String name);
}
