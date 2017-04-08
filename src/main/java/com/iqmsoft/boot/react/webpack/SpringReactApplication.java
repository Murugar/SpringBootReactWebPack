package com.iqmsoft.boot.react.webpack;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;

import com.iqmsoft.boot.react.webpack.domain.Student;
import com.iqmsoft.boot.react.webpack.domain.StudentRepository;

@SpringBootApplication
public class SpringReactApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringReactApplication.class, args);
    }


    @Component
    public class DatabaseLoader implements CommandLineRunner {

        private final StudentRepository repository;

        @Autowired
        public DatabaseLoader(StudentRepository repository) {
            this.repository = repository;
        }

        @Override
        public void run(String... strings) throws Exception {
            repository.save(new Student("Hendi", "Santika", "hendisantika@konohagakure.com"));
            repository.save(new Student("Uzumaki", "Naruto", "uzumaki_naruto@konohagakure.com"));
            repository.save(new Student("Hatake", "Kakashi",  "kakahis_hatake@konohagakure.com"));
            repository.save(new Student("Sakura", "Haruno",  "sakura_haruno@konohagakure.com"));
            repository.save(new Student("Sasuke", "Uchiha",  "sasuke_uchiha@konohagakure.com"));
        }
    }
}
