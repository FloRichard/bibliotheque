package ensicaen.projet.librarymanager.repository;

import ensicaen.projet.librarymanager.entity.BookEntity;
import ensicaen.projet.librarymanager.entity.BorrowingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.Collection;

@Repository
public interface BorrowingRepository extends JpaRepository<BorrowingEntity, Long> {
    @Query(value="SELECT t FROM borrowing t WHERE TO_CHAR(t.idUser) like concat('%', :id, '%')")
    Collection<BorrowingEntity> findByUserId (@Param("id") String id);
}
