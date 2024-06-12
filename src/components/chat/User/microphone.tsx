import { useState, useRef } from "react";

function MicrophoneButton() {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.addEventListener(
        "dataavailable",
        handleDataAvailable
      );
      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.removeEventListener(
        "dataavailable",
        handleDataAvailable
      );
      setRecording(false);
    }
  };

  const handleDataAvailable = (e: BlobEvent) => {
    if (e.data.size > 0) {
      const blob = new Blob([e.data], { type: "audio/webm" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
    }
  };

  // const sendAudioToServer = async () => {
  //   if (audioURL) {
  //     try {
  //       // Convert blob URL to blob
  //       const response = await fetch(audioURL);
  //       const blob = await response.blob();

  //       // Create form data
  //       const formData = new FormData();
  //       formData.append("audio", blob, "recorded_audio.webm");

  //       // Replace with your server endpoint
  //       const serverEndpoint = "http://localhost:3000/upload-audio";

  //       // Send the audio blob to the server
  //       const result = await fetch(serverEndpoint, {
  //         method: "POST",
  //         body: formData,
  //       });

  //       if (result.ok) {
  //         console.log("Audio uploaded successfully");
  //       } else {
  //         console.error("Failed to upload audio");
  //       }
  //     } catch (error) {
  //       console.error("Error sending audio to server:", error);
  //       // Add error handling here
  //     }
  //   }
  // };

  return (
    <div>
      <button onClick={recording ? stopRecording : startRecording}>
        <img src="/images/Mic.png" className="mr-2 h-6 sm:h-9" alt="mic" />
      </button>
      {audioURL && <audio src={audioURL} controls />}
    </div>
  );
}

export default MicrophoneButton;
