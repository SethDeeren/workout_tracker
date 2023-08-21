const ExerciseProgressTracker: React.FC<{
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
}> = (props) => {
  return (
    <div
      onTouchStart={props.onTouchStart}
      onTouchMove={props.onTouchMove}
      onTouchEnd={props.onTouchEnd}
    >
      <h1>Under Construction</h1>
    </div>
  );
};

export default ExerciseProgressTracker;
