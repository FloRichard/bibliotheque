package ensicaen.projet.librarymanager.controller;

import ensicaen.projet.librarymanager.convert.BookEntityDTO;
import ensicaen.projet.librarymanager.entity.BookEntity;
import ensicaen.projet.librarymanager.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("book")
public class BookController {
    @Autowired
    private BookService bookService = new BookService();

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<BookEntity> add(@RequestBody BookEntityDTO book){
        BookEntity a = bookService.add(book.getTitle(), book.getPublicationYear(), book.getDescription(), 0, book.getIdPublisher(), book.getIdAuthors());
        return new ResponseEntity<>(a, HttpStatus.OK);
    }

//    @PostMapping(value = "/addByForm")
//    public ResponseEntity<TodoEntity> addForm(@RequestParam String desc){
//        TodoEntity t = todoService.add(desc);
//        return ResponseEntity.status(HttpStatus.OK).body(t);
//    }

    @GetMapping(value = "/",  produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<BookEntity> getByTitle(@RequestParam(required = false) String byTitle){
        if(byTitle!=null && !byTitle.isEmpty()) {
            System.out.println("HEHO LAAAA");
            return bookService.getByTitle(byTitle);
        }
        else {
            return bookService.list();
        }
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> update(@RequestBody BookEntityDTO book){
        Optional<BookEntity> t = bookService.get(book.getIdBook());
        if (t.isPresent()) {
            bookService.update(t.get(), book.getTitle(), book.getDescription(), book.getPublicationYear(), book.getState());
            return ResponseEntity.status(HttpStatus.OK).body("Book with id : " + book.getIdBook() +" successfully updated");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No book with this id : " + book.getIdBook());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> get(@PathVariable String id){
        Optional<BookEntity> book = bookService.get(Long.parseLong(id));
        return book.<ResponseEntity<Object>>map(bookEntity -> new ResponseEntity<>(bookEntity, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        if(bookService.delete(Long.parseLong(id))) {
            return ResponseEntity.status(HttpStatus.OK).body("Author with id :" + id +" successfully deleted");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No author with this id : " + id);
        }
    }
    
}
