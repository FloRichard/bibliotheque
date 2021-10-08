package ensicaen.projet.librarymanager.controller;

import ensicaen.projet.librarymanager.entity.AuthorEntity;
import ensicaen.projet.librarymanager.entity.PublisherEntity;
import ensicaen.projet.librarymanager.service.PublisherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("publisher")
public class PublisherController {
    @Autowired
    private PublisherService pubService = new PublisherService();


    @PostMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PublisherEntity> add(@RequestBody PublisherEntity pub){
        PublisherEntity a = pubService.add(pub.getName());
        return new ResponseEntity<PublisherEntity>(a, HttpStatus.OK);
    }

//    @PostMapping(value = "/addByForm")
//    public ResponseEntity<TodoEntity> addForm(@RequestParam String desc){
//        TodoEntity t = todoService.add(desc);
//        return ResponseEntity.status(HttpStatus.OK).body(t);
//    }

    @GetMapping(value = "/",  produces = MediaType.APPLICATION_JSON_VALUE)
    public Collection<PublisherEntity> getByName(@RequestParam(required = false) String byName){
        if(byName!=null && !byName.isEmpty()) {
            return pubService.getByName(byName);
        }
        else {
            return pubService.list();
        }
    }

    @PutMapping(value = "/", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> update(@RequestBody PublisherEntity pub){
        Optional<PublisherEntity> t = pubService.get(pub.getIdPublisher());
        if (t.isPresent()) {
            pubService.update(t.get(), pub.getName());
            return ResponseEntity.status(HttpStatus.OK).body("Publisher with id : " + pub.getIdPublisher() +" successfully updated");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No publisher with this id : " + pub.getIdPublisher());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> get(@PathVariable String id){
        Optional<PublisherEntity> pub = pubService.get(Long.parseLong(id));
        if(pub.isPresent()) {
            return new ResponseEntity<>(pub.get(),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        if(pubService.delete(Long.parseLong(id))) {
            return ResponseEntity.status(HttpStatus.OK).body("Publisher with id :" + id +" successfully deleted");
        }
        else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No author with this id : " + id);
        }
    }

    @GetMapping("/{id}/books")
    public ResponseEntity<Object> getBooks(@PathVariable String id){
        Optional<PublisherEntity> publisher = pubService.get(Long.parseLong(id));
        if(publisher.isPresent()) {
            return new ResponseEntity<>(pubService.getBooks(Long.parseLong(id)),HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
}

