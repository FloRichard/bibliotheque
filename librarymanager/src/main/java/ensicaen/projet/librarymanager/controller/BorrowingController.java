package ensicaen.projet.librarymanager.controller;

import ensicaen.projet.librarymanager.service.BorrowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("borrowing")
public class BorrowingController {
    @Autowired
    private BorrowingService borrowService = new BorrowingService();
}
