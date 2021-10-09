package ensicaen.projet.librarymanager.controller;

import ensicaen.projet.librarymanager.convert.BorrowingEntityDTO;
import ensicaen.projet.librarymanager.entity.BookEntity;
import ensicaen.projet.librarymanager.entity.BorrowingEntity;
import ensicaen.projet.librarymanager.service.BookService;
import ensicaen.projet.librarymanager.service.BorrowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@RestController
@RequestMapping("borrowing")
public class BorrowingController {
    @Autowired
    private BorrowingService borrowService = new BorrowingService();
    @Autowired
    private BookService bookService = new BookService();

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BorrowingEntity> add(@RequestBody BorrowingEntityDTO b) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        sdf.setTimeZone(TimeZone.getTimeZone("UTC"));
        Date borrowing = sdf.parse(b.getDateBorrowing());
        Date ret = sdf.parse(b.getDateReturn());
        UUID id = UUID.fromString(b.getIdUser());
        BookEntity book = bookService.get(b.getIdBook()).get();
        BorrowingEntity borrow = borrowService.add(borrowing,ret,id,book);
        bookService.update(book, book.getTitle(), book.getDescription(), book.getPublicationYear(),1);
        return new ResponseEntity<>(borrow, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> get(@PathVariable String id){
        Optional<BorrowingEntity> borrow = borrowService.get(Long.parseLong(id));
        return borrow.<ResponseEntity<Object>>map(borrowingEntity -> new ResponseEntity<>(borrowingEntity, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(value = "/",  produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<BorrowingEntity> getByUserId(@RequestParam(required = false) String byId){
        if(byId!=null && !byId.isEmpty()) {
            return borrowService.getByUserId(byId);
        }
        else {
            return borrowService.list();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        Optional<BorrowingEntity> borrow = borrowService.get(Long.parseLong(id));
        if(borrow.isPresent()){
            BookEntity book = bookService.get(borrow.get().getBook().getIdBook()).get();
            bookService.update(book, book.getTitle(), book.getDescription(), book.getPublicationYear(),0);
        }
        if(borrowService.delete(Long.parseLong(id))) {
            return ResponseEntity.status(HttpStatus.OK).body("Borrowing with id :" + id +" successfully deleted");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No borrow with this id : " + id);
        }
    }

}
