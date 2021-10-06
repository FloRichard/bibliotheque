package ensicaen.projet.librarymanager.service;

import ensicaen.projet.librarymanager.entity.AuthorEntity;
import ensicaen.projet.librarymanager.entity.BookEntity;
import ensicaen.projet.librarymanager.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepo;
    @Autowired
    private PublisherService publisherService;
    @Autowired
    private AuthorService authorService;

    public Collection<BookEntity> list(){
        return bookRepo.findAll();
    }

    public BookEntity add(String title, String publicationYear, String description, int state, Long idPublisher, Collection<Long> idsAuthor){
        Set<AuthorEntity> authors = new HashSet<>();
        idsAuthor.forEach(id -> authors.add(authorService.get(id).get()));
        return bookRepo.save(new BookEntity(title,publicationYear,description,state,publisherService.get(idPublisher).get(), authors));
    }

    public Optional<BookEntity> get(Long id){
        return Optional.of(bookRepo.getById(id));
    }

    public Collection<BookEntity> getByTitle(String title){
        return bookRepo.findByTitle(title);
    }

    public boolean delete(Long id){
        if(bookRepo.existsById(id)){
            bookRepo.deleteById(id);
            return true;
        }
        else
            return false;
    }

    public void update(BookEntity a, String title, String description, String publicationYear){
        a.setTitle(title);
        a.setDescription(description);
        a.setPublicationYear(publicationYear);
        bookRepo.save(a);
    }
    
}
