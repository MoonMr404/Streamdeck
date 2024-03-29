﻿using System.Diagnostics;

namespace Streamdeck;

partial class Form1
{
    /// <summary>
    ///  Required designer variable.
    /// </summary>
    private System.ComponentModel.IContainer components = null;

    /// <summary>
    ///  Clean up any resources being used.
    /// </summary>
    /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
    protected override void Dispose(bool disposing)
    {
        if (disposing && (components != null))
        {
            components.Dispose();
        }

        base.Dispose(disposing);
    }

    #region Windows Form Designer generated code

    /// <summary>
    ///  Required method for Designer support - do not modify
    ///  the contents of this method with the code editor.
    /// </summary>
    private void InitializeComponent()
    {
        this.components = new System.ComponentModel.Container();
        this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
        this.ClientSize = new System.Drawing.Size(800, 450);
        this.Text = "Streamdeck";
    }

    private void InitialiazeButton()
    {
            Button b = new Button();
            b.Location = new Point(200,200);
            b.Text = "Bottone";
            b.Click += new EventHandler(executeScript);
            this.Controls.Add(b);
    }

    private void executeScript(object o, EventArgs e)
    {
        Process s = new Process();
            s.StartInfo.FileName = "python"; // Assicurati che "python" sia nel tuo PATH
            s.StartInfo.Arguments = "ScriptFolder/SpamLink.py";
            s.StartInfo.RedirectStandardOutput = true;
            s.StartInfo.UseShellExecute = false;
            s.StartInfo.CreateNoWindow = true;
            
        s.Start();
		s.WaitForExit();


    }

    #endregion
}