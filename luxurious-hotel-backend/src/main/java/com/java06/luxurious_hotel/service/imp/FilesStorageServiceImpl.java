package com.java06.luxurious_hotel.service.imp;


import com.java06.luxurious_hotel.exception.roomType.FileNotFoundException;
import com.java06.luxurious_hotel.service.FilesStorageService;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.stream.Stream;

@Service
public class FilesStorageServiceImpl implements FilesStorageService {

    private final Path root = Paths.get("uploads");
    @Override
    public void save(MultipartFile file) {
        try {
            if (!Files.exists(root)) {
                Files.createDirectories(root);
            }

            Files.copy(file.getInputStream(), this.root.resolve(file.getOriginalFilename()));
        } catch (Exception e) {
            if (e instanceof FileAlreadyExistsException) {
                throw new RuntimeException("A file of that name already exists.");
            }

            throw new RuntimeException(e.getMessage());
        }
    }

    @Override
    public Resource load(String filename) {



        try {
            Path file = root.resolve(filename);

            Resource resource = new UrlResource(file.toUri());  // Biển file thành resource
            if(resource.exists()){
                return resource;
            }else {
                throw new FileNotFoundException();
            }
        }catch (Exception e){
            throw new FileNotFoundException(e.getMessage());
        }



    }

    @Override
    public void deleteAll() {

    }

    @Override
    public Stream<Path> loadAll() {
        return Stream.empty();
    }
}
