package ensicaen.projet.librarymanager.repository;

import ensicaen.projet.librarymanager.entity.BorrowingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

@Repository
public interface BorrowingRepository extends JpaRepository<BorrowingEntity, Long> {
}
