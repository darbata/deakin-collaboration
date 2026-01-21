import type {Discussion} from "@/types/Discussion.ts";
import type {UnitTopic} from "@/types/UnitTopic.ts";

export type TopicDetails = {
    discussions: Discussion[];
    unitTopic: UnitTopic;
}
