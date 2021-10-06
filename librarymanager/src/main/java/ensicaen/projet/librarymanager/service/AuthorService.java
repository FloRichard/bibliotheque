package ensicaen.projet.librarymanager.service;

import ensicaen.projet.librarymanager.entity.AuthorEntity;
import ensicaen.projet.librarymanager.repository.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class AuthorService {
    @Autowired
    private AuthorRepository authRepo;

    public Collection<AuthorEntity> list(){
        return authRepo.findAll();
    }

    public AuthorEntity add(String name){
        return authRepo.save(new AuthorEntity(name));
    }

    public Optional<AuthorEntity> get(Long id){
        return Optional.of(authRepo.getById(id));
    }

    public Collection<AuthorEntity> getByName(String name){
        return authRepo.findByName(name);
    }

    public boolean delete(Long id){
        if(authRepo.existsById(id)){
            authRepo.deleteById(id);
            return true;
        }
        else
            return false;
    }

    public void update(AuthorEntity a, String name){
        a.setName(name);
        authRepo.save(a);
    }

}
