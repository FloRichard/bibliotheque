package ensicaen.projet.librarymanager.service;

import ensicaen.projet.librarymanager.entity.BookEntity;
import ensicaen.projet.librarymanager.entity.BorrowingEntity;
import ensicaen.projet.librarymanager.repository.BorrowingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class BorrowingService {
    @Autowired
    private BorrowingRepository borrowRepo;

    public Collection<BorrowingEntity> list(){
        return borrowRepo.findAll();
    }

    public BorrowingEntity add(Date dateBorrowing, Date dateReturn, UUID idUser, BookEntity book){
        return borrowRepo.save(new BorrowingEntity(dateBorrowing,dateReturn,idUser,book));
    }

    public Optional<BorrowingEntity> get(Long id){
        return Optional.of(borrowRepo.getById(id));
    }

    public Collection<BorrowingEntity> getByUserId(String id){
        return borrowRepo.findByUserId(id);
    }

    public boolean delete(Long id){
        if(borrowRepo.existsById(id)){
            borrowRepo.deleteById(id);
            return true;
        }
        else
            return false;
    }
}
