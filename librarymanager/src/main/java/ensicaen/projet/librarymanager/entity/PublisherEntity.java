package ensicaen.projet.librarymanager.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.Objects;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity(name = "publisher")
@Table(name = "PUBLISHER", schema = "PUBLIC", catalog = "LIBRARYDB")
public class PublisherEntity {
    private long idPublisher;
    private String name;

    public PublisherEntity(){}

    public PublisherEntity(String name) {
        this.name = name;
    }

    //Faire de même pour les autres ids
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="sequence_pub")
    @SequenceGenerator(name = "sequence_pub", sequenceName = "sequence_pub_h2", allocationSize = 1)
    @Column(name = "ID_PUBLISHER")
    public long getIdPublisher() {
        return idPublisher;
    }

    public void setIdPublisher(long idPublisher) {
        this.idPublisher = idPublisher;
    }

    @Basic
    @Column(name = "NAME")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PublisherEntity that = (PublisherEntity) o;
        return idPublisher == that.idPublisher && Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idPublisher, name);
    }
}
