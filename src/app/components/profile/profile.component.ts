import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NotesService } from "src/app/Services/notes.service";
import jwt_decode from "jwt-decode";
import { FormControl, FormGroup, Validators } from "@angular/forms";
declare var $: any;
@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  AllNotes;
  token;
  decoded;
  isLoad = false;
  constructor(private _Router: Router, private _NotesService: NotesService) {
    try {
      this.token = localStorage.getItem("TOKEN");
      this.decoded = jwt_decode(this.token);
    } catch (error) {
      localStorage.clear();
      this._Router.navigate(["/signin"]);
    }

    this.getAllNotes();

    if (!localStorage.getItem("TOKEN")) {
      this._Router.navigate(["/signin"]);
    }
  }

  AddNote = new FormGroup({
    title: new FormControl("", Validators.required),
    desc: new FormControl("", Validators.required),
  });

  getAllNotes() {
    let data = {
      token: this.token,
      userID: this.decoded._id,
    };
    this._NotesService.getAllNotes(data).subscribe((res) => {
      console.log(res);
      if (res.message == "success") {
        this.isLoad = true;
        this.AllNotes = res.Notes;
      } else {
        localStorage.clear();
        this._Router.navigate(["/signin"]);
      }
    });
  }
  addData() {
    let data = {
      title: this.AddNote.value.title,
      desc: this.AddNote.value.desc,
      token: this.token,
      citizenID: this.decoded._id,
    };

    this._NotesService.addNote(data).subscribe((res) => {
      if (res.message == "success") {
        $("#AddNote").modal("hide");
        this.getAllNotes();
        this.AddNote.reset();
      }
    });
    // console.log(this.AddNote.value);
  }

  // ============================ delete note =================================

  NOTE_ID;
  getID(id) {
    this.NOTE_ID = id;
    console.log(id);
  }

  deleteNote() {
    let data = {
      token: this.token,
      NoteID: this.NOTE_ID,
    };
    this._NotesService.deleteNote(data).subscribe((res) => {
      console.log(res);
      if (res.message == "deleted") {
        $("#DeleteNote").modal("hide");
        this.getAllNotes();
      }
    });
  }

  // ============================= edit=========================
  setValue()
  {
    for (let index = 0; index < this.AllNotes.length; index++) {
    if(this.AllNotes[index]._id==this.NOTE_ID)
    {
      // console.log(this.AllNotes[index]);
      this.AddNote.controls.title.setValue(this.AllNotes[index].title)
      this.AddNote.controls.desc.setValue(this.AllNotes[index].desc)
      
    }
      
    }
  }
  editNote()
  {
    let data={
      title:this.AddNote.value.title,
      desc:this.AddNote.value.desc,
      NoteID:this.NOTE_ID,
      token:this.token
    }

    this._NotesService.updateNote(data).subscribe(res=>{
      console.log(res);
      if(res.message=='updated')
     {
      $("#EditNote").modal("hide");
      this.getAllNotes();
      

     }
      
    })
  }
  ngOnInit() {}
}
