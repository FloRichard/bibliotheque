package ensicaen.projet.librarymanager.service;

import ensicaen.projet.librarymanager.entity.PublisherEntity;
import ensicaen.projet.librarymanager.repository.PublisherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;

@Service
public class PublisherService {
    @Autowired
    private PublisherRepository pubRepo;

    public Collection<PublisherEntity> list(){
        return pubRepo.findAll();
    }

    public PublisherEntity add(String name){
        return pubRepo.save(new PublisherEntity(name));
    }

    public Optional<PublisherEntity> get(Long id){
        return Optional.of(pubRepo.getById(id));
    }

    public Collection<PublisherEntity> getByName(String name){
        return pubRepo.findByName(name);
    }

    public boolean delete(Long id){
        if(pubRepo.existsById(id)){
            pubRepo.deleteById(id);
            return true;
        }
        else
            return false;
    }

    public void update(PublisherEntity a, String name){
        a.setName(name);
        pubRepo.save(a);
    }

}
