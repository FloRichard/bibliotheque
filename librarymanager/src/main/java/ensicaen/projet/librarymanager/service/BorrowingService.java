package ensicaen.projet.librarymanager.service;

import ensicaen.projet.librarymanager.repository.BorrowingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BorrowingService {
    @Autowired
    private BorrowingRepository borrowRepo;
}
