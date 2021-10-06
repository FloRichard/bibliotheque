package ensicaen.projet.librarymanager.controller;

import ensicaen.projet.librarymanager.entity.AuthorEntity;
import ensicaen.projet.librarymanager.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("author")
public class AuthorController {
    @Autowired
    private AuthorService authService = new AuthorService();

    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<AuthorEntity> add(@RequestBody AuthorEntity author){
        AuthorEntity a = authService.add(author.getName());
        return new ResponseEntity<AuthorEntity>(a, HttpStatus.OK);
    }

//    @PostMapping(value = "/addByForm")
//    public ResponseEntity<TodoEntity> addForm(@RequestParam String desc){
//        TodoEntity t = todoService.add(desc);
//        return ResponseEntity.status(HttpStatus.OK).body(t);
//    }

    @GetMapping(value = "/",  produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<AuthorEntity> getByName(@RequestParam(required = false) String byName){
        if(byName!=null && !byName.isEmpty()) {
            return authService.getByName(byName);
        }
        else {
            return authService.list();
        }
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> update(@RequestBody AuthorEntity author){
        Optional<AuthorEntity> t = authService.get(author.getIdAuthor());
        if (t.isPresent()) {
            authService.update(t.get(), author.getName());
            return ResponseEntity.status(HttpStatus.OK).body("Author with id : " + author.getIdAuthor() +" successfully updated");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No author with this id : " + author.getIdAuthor());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> get(@PathVariable String id){
        Optional<AuthorEntity> author = authService.get(Long.parseLong(id));
        if(author.isPresent()) {
            return new ResponseEntity<>(author.get(),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}/books")
    public ResponseEntity<Object> getBooks(@PathVariable String id){
        Optional<AuthorEntity> author = authService.get(Long.parseLong(id));
        if(author.isPresent()) {
            return new ResponseEntity<>(author.get().getBooks(),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        if(authService.delete(Long.parseLong(id))) {
            return ResponseEntity.status(HttpStatus.OK).body("Author with id :" + id +" successfully deleted");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No author with this id : " + id);
        }
    }

}
